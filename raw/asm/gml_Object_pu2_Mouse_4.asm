// gml_Object_pu2_Mouse_4  locals=2 args=0 len=108
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21E0590
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 1372
00000044: conv.i.v
00000048: call action_set_cursor(argc=2)
00000050: popz
00000054: push.imm.e 156
00000058: pushenv 0x21E05A4
0000005C: push.imm.e 2
00000060: pop.v.i selec
00000068: popenv 0x41E0598