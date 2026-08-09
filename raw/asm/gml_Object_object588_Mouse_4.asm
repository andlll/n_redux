// gml_Object_object588_Mouse_4  locals=2 args=0 len=108
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x2107CD4
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.imm.e 2000
00000014: conv.i.v
00000018: push.v mon
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2107CD4
00000040: b 0x2107CDC
00000044: popenv 0x4107C98
00000048: b 0x2107CE0
0000004C: popenv 0x1D07CDC
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2107CFC
00000060: push.imm.e 1
00000064: pop.v.i arm