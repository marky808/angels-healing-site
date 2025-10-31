<?php
/**
 * シンプルなPHPMailer代替クラス（ロリポップ対応）
 * mb_send_mail()が失敗する場合の代替手段
 */
class SimpleMailer {
    private $to;
    private $subject;
    private $body;
    private $from;
    private $replyTo;
    private $headers = array();
    
    public function __construct() {
        // デフォルト設定
        $this->headers[] = "MIME-Version: 1.0";
        $this->headers[] = "Content-Type: text/plain; charset=UTF-8";
        $this->headers[] = "Content-Transfer-Encoding: 8bit";
        $this->headers[] = "X-Mailer: PHP/" . phpversion();
    }
    
    public function setFrom($email, $name = '') {
        if ($name) {
            $this->from = "=?UTF-8?B?" . base64_encode($name) . "?= <{$email}>";
        } else {
            $this->from = $email;
        }
        return $this;
    }
    
    public function addReplyTo($email) {
        $this->replyTo = $email;
        return $this;
    }
    
    public function addAddress($email) {
        $this->to = $email;
        return $this;
    }
    
    public function setSubject($subject) {
        // 件名をBase64エンコード（日本語対応）
        $this->subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
        return $this;
    }
    
    public function setBody($body) {
        $this->body = $body;
        return $this;
    }
    
    public function send() {
        // ヘッダー構築
        $headers = $this->headers;
        if ($this->from) {
            $headers[] = "From: {$this->from}";
        }
        if ($this->replyTo) {
            $headers[] = "Reply-To: {$this->replyTo}";
        }
        
        $headers_str = implode("\r\n", $headers);
        
        // 追加パラメータ（エンベロープFrom）
        $additional_params = "-f info@angels-healing.com";
        
        // mail()関数で送信（mb_send_mailより互換性が高い）
        $result = mail($this->to, $this->subject, $this->body, $headers_str, $additional_params);
        
        // デバッグログ
        if (!$result) {
            error_log("SimpleMailer送信失敗: To={$this->to}, Subject={$this->subject}");
        }
        
        return $result;
    }
}
?>
