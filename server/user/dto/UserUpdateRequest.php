<?php
class UserUpdateRequest
{
    public string $username;
    public string $password;
    public string $id;
    public string $fullName;
    public string $dob;
    public string $email;
    public string $point;
    public string $bankAccountID;
    public string $address;
    public string $phoneNumber;

    /**
     * UserRegisterRequest constructor.
     * @param string $password
     * @param string $id
     * @param string $fullName
     * @param string $username
     * @param string $dob
     * @param string $email
     * @param string $point
     * @param string $bankAccountID
     * @param string $address
     * @param string $phoneNumber
     */
    public function __construct(string $password="", string $id="", string $fullName="", string $username="",
                                string $dob="", string $email="", string $point="", string $bankAccountID="",
                                string $address="", string $phoneNumber="")
    {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->fullName = $fullName;
        $this->dob = $dob;
        $this->email = $email;
        $this->point = $point;
        $this->bankAccountID = $bankAccountID;
        $this->address = $address;
        $this->phoneNumber = $phoneNumber;
    }
}