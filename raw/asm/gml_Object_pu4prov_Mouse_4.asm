// gml_Object_pu4prov_Mouse_4  locals=2 args=0 len=164
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.v unlos
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21E120C
00000038: push.imm.e 156
0000003C: pushenv 0x21E11B4
00000040: push.imm.e 4
00000044: pop.v.i selec
0000004C: popenv 0x41E11A8
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.builtin.v os_type
00000068: call action_if_variable(argc=3)
00000070: pop.v.v local.__b__
00000078: push.local.v local.__b__
00000080: conv.v.b
00000084: bf 0x21E120C
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1372
00000094: conv.i.v
00000098: call action_set_cursor(argc=2)
000000A0: popz