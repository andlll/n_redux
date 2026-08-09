// gml_Object_pu4prov_Mouse_11  locals=2 args=0 len=360
// locals: arguments, __b__
00000000: push.imm.e 142
00000004: pushenv 0x21E0E34
00000008: push.imm.e 1
0000000C: pop.v.i goer
00000014: popenv 0x41E0E28
00000018: push.imm.e 0
0000001C: conv.i.v
00000020: push.imm.e 1
00000024: conv.i.v
00000028: push.v unlos
00000030: call action_if_variable(argc=3)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x21E0F28
00000050: push.imm.e 156
00000054: pushenv 0x21E0EB4
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 4
00000064: conv.i.v
00000068: push.v selec
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x21E0EB4
00000090: b 0x21E0EBC
00000094: popenv 0x41E0E78
00000098: b 0x21E0EC0
0000009C: popenv 0x1DE0EBC
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x21E0EF8
000000B0: push.imm.e 1
000000B4: conv.i.v
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: push.imm.e 507
000000C4: conv.i.v
000000C8: call action_sprite_set(argc=3)
000000D0: popz
000000D4: b 0x21E0F1C
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 505
000000EC: conv.i.v
000000F0: call action_sprite_set(argc=3)
000000F8: popz
000000FC: push.imm.e 0
00000100: pop.v.i over
00000108: push.imm.e 672
0000010C: pushenv 0x21E0F3C
00000110: call action_kill_object(argc=0)
00000118: popz
0000011C: popenv 0x41E0F30
00000120: push.imm.e 684
00000124: pushenv 0x21E0F54
00000128: call action_kill_object(argc=0)
00000130: popz
00000134: popenv 0x41E0F48
00000138: push.imm.e 147
0000013C: pushenv 0x21E0F6C
00000140: call action_kill_object(argc=0)
00000148: popz
0000014C: popenv 0x41E0F60
00000150: push.imm.e 146
00000154: pushenv 0x21E0F84
00000158: call action_kill_object(argc=0)
00000160: popz
00000164: popenv 0x41E0F78