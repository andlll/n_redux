// gml_Object_pu7_Mouse_11  locals=2 args=0 len=336
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.v unlocinque
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21DEB00
00000038: push.imm.e 156
0000003C: pushenv 0x21DEA8C
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 7
0000004C: conv.i.v
00000050: push.v selec
00000058: call action_if_variable(argc=3)
00000060: pop.v.v local.__b__
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: bf 0x21DEA8C
00000078: b 0x21DEA94
0000007C: popenv 0x41DEA50
00000080: b 0x21DEA98
00000084: popenv 0x1DDEA94
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x21DEAD0
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 498
000000AC: conv.i.v
000000B0: call action_sprite_set(argc=3)
000000B8: popz
000000BC: b 0x21DEAF4
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: push.imm.e 496
000000D4: conv.i.v
000000D8: call action_sprite_set(argc=3)
000000E0: popz
000000E4: push.imm.e 0
000000E8: pop.v.i over
000000F0: push.imm.e 147
000000F4: pushenv 0x21DEB14
000000F8: call action_kill_object(argc=0)
00000100: popz
00000104: popenv 0x41DEB08
00000108: push.imm.e 146
0000010C: pushenv 0x21DEB2C
00000110: call action_kill_object(argc=0)
00000118: popz
0000011C: popenv 0x41DEB20
00000120: push.imm.e 679
00000124: pushenv 0x21DEB44
00000128: call action_kill_object(argc=0)
00000130: popz
00000134: popenv 0x41DEB38
00000138: push.imm.e 654
0000013C: pushenv 0x21DEB5C
00000140: call action_kill_object(argc=0)
00000148: popz
0000014C: popenv 0x41DEB50