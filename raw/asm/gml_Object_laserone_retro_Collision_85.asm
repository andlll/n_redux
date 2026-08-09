// gml_Object_laserone_retro_Collision_85  locals=2 args=0 len=376
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v nocivo
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x210FAC4
0000004C: push.v other.id
00000054: conv.v.i
00000058: pushenv 0x210FA8C
0000005C: push.v life
00000064: push.imm.e -2
00000068: add.i.v
0000006C: pop.v.v life
00000074: popenv 0x410FA74
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: call action_set_relative(argc=1)
00000088: popz
0000008C: push.imm.e 0
00000090: pop.v.i nocivo
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: call action_set_relative(argc=1)
000000A8: popz
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: call action_set_relative(argc=1)
000000BC: popz
000000C0: push.imm.e 1
000000C4: pop.v.i dat
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: call action_set_relative(argc=1)
000000DC: popz
000000E0: push.v other.id
000000E8: conv.v.i
000000EC: pushenv 0x210FB30
000000F0: push.imm.e 0
000000F4: conv.i.v
000000F8: push.imm.e 1
000000FC: conv.i.v
00000100: push.v desto
00000108: call action_if_variable(argc=3)
00000110: pop.v.v local.__b__
00000118: popenv 0x410FB08
0000011C: push.local.v local.__b__
00000124: conv.v.b
00000128: bf 0x210FB7C
0000012C: push.v other.id
00000134: conv.v.i
00000138: pushenv 0x210FB78
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.imm.e 606
00000150: conv.i.v
00000154: call action_create_object(argc=3)
0000015C: popz
00000160: popenv 0x410FB54
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: call action_set_relative(argc=1)
00000174: popz