// gml_Object_pugatling_Mouse_11  locals=2 args=0 len=288
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
00000034: bf 0x21E376C
00000038: push.imm.e 156
0000003C: pushenv 0x21E36F8
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 62
0000004C: conv.i.v
00000050: push.v selec
00000058: call action_if_variable(argc=3)
00000060: pop.v.v local.__b__
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: bf 0x21E36F8
00000078: b 0x21E3700
0000007C: popenv 0x41E36BC
00000080: b 0x21E3704
00000084: popenv 0x1DE3700
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x21E373C
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 476
000000AC: conv.i.v
000000B0: call action_sprite_set(argc=3)
000000B8: popz
000000BC: b 0x21E3760
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: push.imm.e 474
000000D4: conv.i.v
000000D8: call action_sprite_set(argc=3)
000000E0: popz
000000E4: push.imm.e 0
000000E8: pop.v.i over
000000F0: push.imm.e 664
000000F4: pushenv 0x21E3780
000000F8: call action_kill_object(argc=0)
00000100: popz
00000104: popenv 0x41E3774
00000108: push.imm.e 682
0000010C: pushenv 0x21E3798
00000110: call action_kill_object(argc=0)
00000118: popz
0000011C: popenv 0x41E378C