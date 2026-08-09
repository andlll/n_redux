// gml_Object_pugatling_Mouse_4  locals=2 args=0 len=164
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.v unlosei
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21E3968
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.builtin.v os_type
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x21E3950
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 1372
0000007C: conv.i.v
00000080: call action_set_cursor(argc=2)
00000088: popz
0000008C: push.imm.e 156
00000090: pushenv 0x21E3964
00000094: push.imm.e 62
00000098: pop.v.i selec
000000A0: popenv 0x41E3958